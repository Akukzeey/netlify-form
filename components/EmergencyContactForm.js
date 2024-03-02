import React from "react";

export default function Step3() {
    return(
        <form name="administration Info" data-netlify="true" method='post' data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
            <input type='hidden' name='form-name' value='administration Info'/>
            <div hidden>
                <input name='bot-field'/>
            </div>
            <div className="mb-lg-4 mb-md-3 mb-2">
                <label htmlFor="your-name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="your-name" name='your-name' required/>
            </div>
            <button type="button">Previous</button>
            <button type="submit">Submit</button>
        </form>
    )
}


