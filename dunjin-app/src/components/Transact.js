
import React,{Component} from "react";
import "./stylesheets/Transact.css";

class Transact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catdog: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSelect(this.state);
    }

    handleCategories(event, name) {
        const cat = event.target.value;

        this.setState(state => {
            state.catdog[name] = cat;
        });
        event.preventDefault();
    }

    render() {
        var d = new Date(), t = [], i = 0;

        if (this.props.transactions[0] !== undefined) {
            d.setDate(d.getDate() - 31); 

            while (this.props.transactions[i] !== undefined && new Date(this.props.transactions[i].date) > d) {
                t.push(this.props.transactions[i++]);
            }
        }
        
        return(
            <div className="bgTable">
                <div style={{marginTop:"5px", display:"inline-block"}}>
                    <form onSubmit={this.handleSubmit}>
                        <table className="trtable">
                            <tr>
                                <th>Date</th>
                                <th>Name </th>
                                <th>Amount ($)</th>
                                <th>Category</th>
                            </tr>
                            {t.map((item,indx) => (
                                <tr>
                                    <td>{item.date}</td>
                                    <td name="name">{item.name}</td>
                                    <td>{item.amount}</td>
                                    <td> 
                                        <select name="category" className="dropdown" id="categories" onChange={e => this.handleCategories(e, item.name)}>
                                            <option value="None">Select category:</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Housing">Housing</option>
                                            <option value="Utilities">Utilities</option>
                                            <option value="Transportation">Transportation</option>
                                            <option value="Food">Food</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Gifts/Donations">Gifts/Donations</option>
                                            <option value="Savings">Savings</option>
                                            <option value="Education">Education</option>
                                            <option value="Retirement">Retirement</option>
                                            <option value="Debt">Debt</option>
                                            <option value="Personal">Personal</option>
                                            <option value="Insurance">Insurance</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <input type="submit" className="tBtn" value="Save categories"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default Transact;