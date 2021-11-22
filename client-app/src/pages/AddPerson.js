import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

const AddPerson = () => {

    const [person, setPerson] = useState({firstName: '', lastName: '', age: ''});
    const history = useHistory();

    const onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addperson', person);
        history.push('/');
    }

    const onTextChange = e => {
        const copy = { ...person };
        copy[e.target.name] = e.target.value;
        setPerson(copy);
    }

    return (
        <div style={{ minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    <h2>Add a New Person</h2>
                    <input type="text" className='form-control' name='firstName' value={person.firstName} onChange={onTextChange} placeholder="First Name" />
                    <br />
                    <input type="text" className='form-control' name='lastName' value={person.lastName} onChange={onTextChange} placeholder="Last Name" />
                    <br />
                    <input type="text" className='form-control' name='age' value={person.age} onChange={onTextChange} placeholder="Age" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddPerson;