import React from 'react';
import "../../styles/MainWorkerSheet/Record.css"

const Post = (props) => {
    return (
        <div className="Record">
            <h1>
                <div dangerouslySetInnerHTML={{__html: props.post.tittle}}/>
            </h1>
            <div dangerouslySetInnerHTML={{__html: props.post.text}}/>
            <a href={props.post.link}>Подробнее</a>
        </div>
    );
};

export default Post;