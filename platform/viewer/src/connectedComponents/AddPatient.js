/* eslint-disable react/react-in-jsx-scope */
import React, { Component  } from 'react';
import { withRouter  } from "react-router-dom";
import axios from 'axios';
import load from './load.gif'
import './auth.css'
import patient from './image.png';
import ConnectedHeader from './ConnectedHeader';
import { Icon } from '../../../ui/src';


class AddPatient extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }

   fileInput=React.createRef();

  state = {

      imageList:null,
      taille:'Choose Files ',
      messageSucces:null,
      messageError:null,
      percentage:0

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
     taille:files.length + ' files added',
     loading:false
 });




}


  options={
    onUploadProgress : (progressEvent)=>{
      const {loaded, total} = progressEvent;
      let percent = Math.floor((loaded*100)/ total)
      console.log(percent)
      if (percent<=100){
        this.setState({percentage:percent})
      }
    }
  }



    handleSubmit =   event=> {
        event.preventDefault()

        const formData= new FormData();
        for (let i = 0; i < this.state.imageList.length; i++) {
        formData.append(`files[${i}]`,this.state.imageList[i])
        }
        const  taille=this.state.imageList.length;
        console.log('files : ', this.state.imageList)
        this.setState({loading:true});
        axios.post('http://localhost:5985/studies',formData,this.options, {
          headers:{
            'Content-Type':'multipart/form-data; type=application/dicom; boundary=--594b1491-fdae-4585-9b48-4d7cd999edb3',
            'Content-Length':taille || 0

          }
        })

        .then((res)=> {

            this.setState({percentage:100})
            this.setState({
              messageSucces:res.data,

            })


         } ).catch(err => { this.setState({
              messageError:err.message,

            }) });

 }

    handleChange= (event)=> {
        event.preventDefault()
   this.setState({[event.target.name]: event.target.value});

 }

    render() {
        return <><ConnectedHeader/> <div className="container " >
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
>  { this.state.taille}</button>


</div>
      </div>
      {this.state.loading && !this.state.messageSucces  && !this.state.messageError?
      <div className='files'>   Loading  <img src={load} className='load' width='30px' height='30px'></img>  </div>:null
      }
     {this.state.messageSucces ? (<div className='succes'>
            Patient added successfully
    </div>) : ( this.state.messageError ? (<div className='error'>
            Only Dicom Files
    </div>):(null))}
              <div className="hrl"></div>
             <div className="footer-login ">



             <button className='btn-first' onClick={this.handleSubmit}>ADD PATIENT</button>


             </div>





             </div>
             </div>
             </div>
             </div>

             </div></div></>;

    }
}
export default withRouter(AddPatient);
