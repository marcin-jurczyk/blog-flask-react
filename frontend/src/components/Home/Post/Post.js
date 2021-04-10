import React from "react";
import {gradient, randomType} from "../../../services/gradient";
import moment from "moment";

import "./layout.css"

export const Post = props => {

    const bgGradient = { background: gradient(props.title, "diagonal", 0.1)}
    const date = moment(props.date)

    return (
        <div className="post" style={bgGradient}>
            <time className="date">
                <span className="date__day">{date.date()}</span>
                <span className="date__month_year">{date.format('MMM')} {date.year()}</span>
                <span className="date__hours">{date.format('h:m:s')}</span>
            </time>
            <div className="post_content">
                <div className="post_title">
                    {props.title}
                </div>
                <div className="post_body">
                    {props.body}
                </div>
            </div>
        </div>
    )
}