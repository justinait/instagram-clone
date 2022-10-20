import { Button } from '@mui/material';
import React, {Component} from 'react'

class Gif extends Component {
    constructor(props){
        super(props);
        this.state = {
            gif: ''
        }
    }
    apiCall(url, handler) {
        fetch(url)
        .then(response => response.json())
        .then( data => handler(data))
        .catch( error => console.log(error))
    }
    componentDidMount() {
        console.log('listo');
        this.apiCall("https://api.giphy.com/v1/gifs/random?api_key=w6ksrp57hKicQa5JSA7IARHcGtSRvJDC&tag=&rating=g", this.mostrarGif)
    }
    mostrarGif = (data) => {
        this.setState( {
            gif: data.data.url
        })
    }
    componentDidUpdate() {
        console.log('listo');
    }
    
    render() {
        let contenido;

        if(this.state.gif === ''){
            contenido = <p>cargando</p>
        } else {
            contenido = <img src={this.state.gif} alt="" />
        }

        return (
            <div>
                {contenido}
                <Button>random gif</Button>
            </div>
        )
    }
}

export default Gif;