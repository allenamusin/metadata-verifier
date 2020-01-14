import React from 'react';
import Dropzone from 'react-dropzone';
import Tab from './components/Tab';
import Header from './components/Header';
import TabContents from './components/TabContents';

class App extends React.Component {
    state = {
        tabLocation: 0
      }

    render() {
        const NUMBER_OF_TABS=2;
        const TAB_COUNT = () => {
            if (this.state.tabLocation < 1) {
                this.setState({
                    tabLocation: this.state.tabLocation + 1
                });
            } else if (this.state.tabLocation > 0) {
                this.setState({
                    tabLocation: this.state.tabLocation - 1
                });
            }
        };
        const shouldShowNext = this.state.tabLocation < NUMBER_OF_TABS - 1;
        const nextButton = shouldShowNext && (
            <div class="nextLocation">
                <a herf="" class="next" onClick={TAB_COUNT}>Next &raquo;</a>
            </div>
        );
        const shouldShowBack = this.state.tabLocation > 0;
        const backButton = shouldShowBack && (
            <div class="nextLocation">
                <a herf="" class="next" onClick={TAB_COUNT}>&laquo; Back</a>
            </div>
        );

        return (
            <div className="App">
                <div class="header">
                    <Tab current={this.state.tabLocation} val={0}/>
                    <Tab current={this.state.tabLocation} val={1}/>
                </div>
                {nextButton}
                {backButton}
                <TabContents current={this.state.tabLocation} val={0}/>
            </div>
        );
    }
}

export default App;
