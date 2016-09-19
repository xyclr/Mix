/**
 * Created by pomy on 15/11/4.
 */
require('../css/base.less');
require('../css/index.less');
var React = require('react');
var $ = require('jquery');

var IndexHeader = React.createClass({
    render: function() {
        return (
            <div className="index-header">
                <div className="w">
                    <div className="info">
                        <a href="#" className="logo"></a>
                        <h3>Create and Share</h3>
                        <p>sunning business story</p>
                        <div className="download">
                            <a href="#" className="btn-google">google play</a>
                            <a href="#" className="btn-apk">apk</a>
                        </div>
                    </div>
                    <div className="phone"></div>
                </div>
            </div>
        );
    }
});


var IndexFeature = React.createClass({
    render: function(){
        return (
            <div className="feature">
                <div className="w">
                    <div className="item">
                        <strong></strong>
                        <h3>Easy and Fast</h3>
                        <p>
                            Easy and FastEasy and FastEasy and FastEasy and FastEasy and Fast
                        </p>
                    </div>
                    <div className="item">
                        <strong></strong>
                        <h3>Easy and Fast</h3>
                        <p>
                            Easy and FastEasy and FastEasy and FastEasy and FastEasy and Fast
                        </p>
                    </div>
                    <div className="item">
                        <strong></strong>
                        <h3>Easy and Fast</h3>
                        <p>
                            Easy and FastEasy and FastEasy and FastEasy and FastEasy and Fast
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

var Variety = React.createClass({
    render: function(){
        return (
            <div className="variety">
                <div className="w">
                    <h3>xxx</h3>
                    <div className="cnt">
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                        <div className="item">
                            <s></s>
                            <p>xxxxx</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

var Index = React.createClass({
    render: function(){
        return (
            <div className="Index">
                <IndexHeader />
                <IndexFeature />
                <Variety />
            </div>
        );
    }
})



React.render(<Index />, document.body);
//
//var img = document.createElement("img");
//img.src = require("./pic.png");
//
//document.body.appendChild(img);






