//4th Child Component
//Do only 1 feature 
import React, {Component} from 'react';

export class VisibilityControl extends Component
{
    render=()=>
    <div className="form-check">
        <input type="checkbox" className="form-check-input" checked={this.props.isChecked} onChange={(e)=>{this.props.callback(e.target.checked)}}/>
        <label className="form-check-label">
            Show {this.props.description}
        </label>
        {/*used props to receive data from parent componet*/}
    </div>
}