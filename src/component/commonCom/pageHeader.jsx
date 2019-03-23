import React from 'react';

class PageHeader extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		document.title = this.props.headtitle;
	}

	render(){
		return (
			<div className="lll-pagehead">
				<h1>{this.props.headtitle}</h1>
				{this.props.children}
			</div>
		)
	}
}

export default PageHeader;