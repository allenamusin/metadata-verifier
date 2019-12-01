import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<div class="header logo-wrapper">
			 <img class="logo" src='/static/logo.png' alt="logo" />
			 <div class="logOutText">
				 <div>
					 <p><a href="{% url 'account_logout' %}">Log Out</a></p>
				 </div>
			 </div>
			</div>
		);
	}
}
