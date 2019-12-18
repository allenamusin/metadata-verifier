import React, { Component } from "react";
import Token from '../utils/Token';
import Dropzone from 'react-dropzone';
import EXIF from 'exif-js';
import Loader from 'react-loader-spinner';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.addMetadata = this.addMetadata.bind(this);
        this.processFiles = this.processFiles.bind(this);
    }

    state = {
        savedFiles: [],
        droppedFiles: [],
        metadata: [],
        isLoading: false,
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        fetch('/files', {
            method: 'GET',
            headers: Token.getTokenHeader(),
        })
            .then(response => response.json())
            .then(success => {
                this.setState({
                    savedFiles: success.results,
                    isLoading: false,
                });
            })
            .catch(error => console.log(error)
            );
    }

    componentDidUpdate() {
        const { droppedFiles, metadata } = this.state;
        if (droppedFiles.length !== 0 && droppedFiles.length === metadata.length) {
            fetch('/upload', {
                method: 'POST',
                headers: Token.getTokenHeader(),
                body: JSON.stringify({ metadata }),
            })
                .then(response => response.json())
                .then(success => {
                    this.setState({
                        savedFiles: success.results,
                        droppedFiles: [],
                    });
                })
                .catch(error => console.log(error));
        }
    }

    addMetadata(additionalMetadata) {
        this.setState({ metadata: this.state.metadata.concat(additionalMetadata) });
    }

    deleteFile(id){
        fetch(`/delete/${id}`, {
            method: 'POST',
            headers: Token.getTokenHeader(),
        })
            .then(response => response.json())
            .then(success => {
                this.setState({
                    savedFiles: success.results,
                });
            })
            .catch(error => console.log(error));
    }

    deleteAllFiles(){
        fetch(`/delete`, {
            method: 'POST',
            headers: Token.getTokenHeader(),
        })
            .then(response => response.json())
            .then(success => {
                this.setState({
                    savedFiles: success.results,
                });
            })
            .catch(error => console.log(error));
    }

    processFiles(droppedFiles) {
        const that = this;
        this.setState({ droppedFiles, metadata: [] });
        droppedFiles.forEach(file => {
            EXIF.getData(file, function() {
                const metadataRecord = EXIF.getAllTags(this);
                that.addMetadata(metadataRecord);
            });
        });
    }

    render() {
        const {val, current} = this.props;
        const shouldShowSpinner = this.state.isLoading;
        const showSpinner = shouldShowSpinner && (
            <div class="loadingSpinner">
            <Loader
                type="ThreeDots"
                color="#92B87C"
                height={50}
                width={50}
            />
            </div>
        );

        return (
            <div>
            <div class="dropzoneWrapper">
            <Dropzone
                onDrop={this.processFiles}
                multiple
            >
            {({getRootProps, getInputProps, isDragActive}) => (
                <div {...getRootProps()} class="dropzoneContents">
                    <input {...getInputProps()} />
                    <div>
                        <div>
                            <span class="dropzoneText">
                                Drag & drop or click here to add your
                            </span>
                        </div>
                    <div>
                        <span class="dropzoneText">
                            compliant aerial image files.
                        </span>
                    </div>
                    <div>
                        <span class="dropzoneAlertText">
                            { isDragActive && 'Let go!' }
                        </span>
                    </div>
                </div>
            </div>
        )}
        </Dropzone>
        </div>
        <ul class="listUL">
            <div class="deleteAll">
                <a herf="" class="next" onClick={() => this.deleteAllFiles(this.state.savedFiles)}>Delete All</a>
            </div>
            {showSpinner}
            {this.state.savedFiles.map(eachFile => {
                const nameDisplayed = eachFile.name.split('\\').slice(-1)[0];
                const dateDisplayed = new Date(eachFile.timestamp).toLocaleDateString('en-US', {hour:"numeric", minute:"numeric"});
            return (
                <li className="list-group-item" class="metadata">
                    <div class="nextLocation">
                        <a herf="" class="next" onClick={() => this.deleteFile(eachFile.id)}>X</a>
                    </div>
                    <div class="metaTextName">{nameDisplayed}</div>
                    <div>{dateDisplayed}</div>
                    <div>Latitude: {eachFile.lat}</div>
                    <div>Longitude: {eachFile.lon}</div>
                    <div>Airspace Name: {eachFile.airspace_name}</div>
                    <div>Airspace Class: {eachFile.airspace_class}</div>
                </li>
              );
              })}
        </ul>
        </div>
        );
    }
}
