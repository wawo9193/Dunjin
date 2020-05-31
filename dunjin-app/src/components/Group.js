import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import './stylesheets/Group.css';

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month:1,
            store:[]
        };

        this.monthSelect = this.monthSelect.bind(this);
        this.monthChange = this.monthChange.bind(this);
    }

    monthSelect(event) {
        event.preventDefault();

        var l = new Date(), u = new Date(), t = [], i = 0;

        if (this.props.transactions[0] !== undefined) {
            l.setDate(l.getDate() - (this.state.month * 31)); 
            u.setDate(u.getDate() - (this.state.month * 31) + 31);

            console.log(l);
            console.log(u);

            while (this.props.transactions[i] !== undefined && 
                   new Date(this.props.transactions[i].date) > l) {
                if (new Date(this.props.transactions[i].date) < u) { t.push(this.props.transactions[i]); }
                i++;
            }
        }

        if (this.props.categories === undefined || this.props.categories.length === 0) {
            return (<div/>)
        }
        var catMap = {};
        var catAmt = {};
        var arr = [];
        var colors = ['#6ee06b','#be6be0','#e06bab','#6bb2e0','#f08142'];
        var count = 0;
    
        this.props.categories.map(item => {
            catMap[item.name] = item.category;
        });
        this.props.transactions.map(item => {
            if (catMap.hasOwnProperty(item.name) && catAmt.hasOwnProperty(catMap[item.name])) {
                catAmt[catMap[item.name]]+=item.amount;
            } else if (catMap.hasOwnProperty(item.name)) {
                catAmt[catMap[item.name]]=0;
                catAmt[catMap[item.name]]+=item.amount;
            }
        });
        for (var key in catAmt) {
            if (catAmt.hasOwnProperty(key) && count<colors.length) {
                arr.push({category:key, value:catAmt[key], color: colors[count++]});
            }
        }
        this.setState({ store: arr });
    }

    monthChange(event) {
        event.preventDefault();
        this.setState({month: parseInt(event.target.value)});
    }

    render () {
        return (
            <div className="container">
                <div className="innercontainer">
                    <div className="piechartbg">
                        <PieChart 
                            className="piechart"
                            slices={this.state.store}
                        />
                    </div>
                    <div className="piechartinfo">
                        <table>
                            {this.state.store.map(item => 
                                <tr>
                                    <td>
                                        <div style={{float:"left",backgroundColor:item.color,width:"20px",height:"20px"}}/>
                                    </td>
                                    <td>
                                        {item.category}: ${item.value.toFixed(2)}
                                    </td>
                                </tr>
                            )}
                        </table>
                        <form className="monthform" onSubmit={this.monthSelect}>
                            <label>Choose month:</label>
                            <select name="month" onChange={this.monthChange}>
                                <option value="1">Past month</option>
                                <option value="2">Two months ago</option>
                                <option value="3">Three months ago</option>
                            </select>
                            <br/><br/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Group;