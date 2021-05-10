/* eslint-disable react/react-in-jsx-scope */
import React, { Component  } from 'react';
import { withRouter  } from "react-router-dom";
import axios from 'axios';
import './auth.css'
import patient from './image.png';


class AddPatient extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }

   fileInput=React.createRef();

  state = {

      imageList:null,
      taille:'Choose a Dicom Files',
      messageSucces:null,
      messageAdded:null

    };





 getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object

        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

handleChangeFile =e =>{


     const files=e.target.files;


      this.setState({

     imageList: files,
     taille:files.length + ' files added'
 });




}

    handleSubmit =   event=> {
        event.preventDefault()

        const formData= new FormData();
        for (let i = 0; i < this.state.imageList.length; i++) {
        formData.append(`files[${i}]`,this.state.imageList[i])
        }

        console.log('files : ', this.state.imageList)
        axios.post('http://localhost:5985/studies',formData, {
          headers:{
            'Content-Type':'multipart/form-data; type=application/dicom; boundary=--594b1491-fdae-4585-9b48-4d7cd999edb3',
            'Content-Length':this.state.imageList

          }
        })

        .then((res)=> {


            this.setState({
              messageSucces:res.data,

            })
         } );

 }

    handleChange= (event)=> {
        event.preventDefault()
   this.setState({[event.target.name]: event.target.value});

 }

    render() {
        return <div className="container " >
         <div className='card-patient th '>

            <div className='column'>
               <div className='color image-list'>
            <div className='imgitems'>
              <img src={patient} width='300px' height='300px'></img>
              </div>
              </div>
            </div>
          <div className='column'>

            <div className="card-items">
        <div className="block">
            <div className="input-t">
                <div className="top-login">
                <label className="text"><center>ADD PATIENT</center></label>
                </div>
                <div className="content">
                     <input type="text" className="form__field" placeholder="Patient ID " name="id" onChange={this. handleChange}></input>
                <input type="text" className="form__field" placeholder="Patient Name" name="nom" onChange={this. handleChange}></input>



             <textarea  className="form__field" placeholder="Description " name="description" onChange={this. handleChange}></textarea>

     <input type='file' onChange={this. handleChangeFile} ref={this.fileInput} style={{ display: 'none' }} multiple></input>
     <div>
     <button
  className='upload-btn'
  onClick={() => this.fileInput.current.click()}
>Choose File</button>

       {this.state.taille='Choose a Dicom files' ? (<div className='files'>
            {this.state.taille}
    </div>) : (<div className='files'> {this.state.taille }</div>)}
</div>
      </div>

     {this.state.messageSucces ? (<div className='succes'>
            Patient added successfully
    </div>) : (null)}
              <div className="hrl"></div>
             <div className="footer-login ">



             <button className='btn-first' onClick={this.handleSubmit}>ADD PATIENT</button>


             </div>





             </div>
             </div>
             </div>
             </div>

             </div></div>;

    }
}
export default withRouter(AddPatient);
