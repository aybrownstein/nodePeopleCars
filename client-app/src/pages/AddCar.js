import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const AddCar = () => {

    const [car, setCar] = useState({ 
        make: '',
        model: '',
        year: '',
        personId: ''
    });

    const [person, setPerson] = useState({
        firstName: '', 
        lastName: ''
    });

    const history = useHistory();
    const params = useParams();
    const {personId} = params;

    useEffect(() => {
        setCar({personId: personId})
        const getPerson = async () => {
            const { data } = await axios.get(`/api/peoplecars/getpersonbyid?id=${personId}`);
            setPerson(data);
            console.log({data});
        }
        getPerson();
    }, [personId]);

    const onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addcar', car);
        history.push('/');
    }

    const onTextChange = e => {
        const copy = { ...car };
        copy[e.target.name] = e.target.value;
        setCar(copy);
    }

    return (
        <div style={{minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    {person.firstName && <h2>Add a car for {person.firstName} {person.lastName}</h2>}
                    <input type="text" className='form-control' name='make' value={car.make} onChange={onTextChange} placeholder="Make" />
                    <br />
                    <input type="text" className='form-control' name='model' value={car.model} onChange={onTextChange} placeholder="Model" />
                    <br />
                    <input type="text" className='form-control' name='year' value={car.year} onChange={onTextChange} placeholder="Year" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddCar;