import React, { useState, useEffect } from 'react'

const RegisterForm = (props) => {
  // Variavel para captura de dados 
  const initialValue = {
    nomeCompleto: '',
    telefone: '',
    email: '',
    endereco: ''
  }

  let [values, setValues] = useState(initialValue)

// função para mostrar se existe algum id para ser editado no formulario
// e  então mostrar na tela
  useEffect(() =>{
    if(props.currentId == '') {
      setValues({
        ...initialValue
      })
    }else {
      setValues({
        ...props.userData[props.currentId]
      })
    }
  }, [props.currentId, props.userData])


  // função para capturar o que se está digitando em cada campo
  const inputChange = e => {
    let {name, value} = e.target
    
    setValues({
      ...values,
      [name]: value
    })
  }

  //função para evitar que o formulario seja enviado e que mude de página
  const formSubmitHandle = e => {
    e.preventDefault()
    props.addEdit(values)
  }

  return (
    <form autoComplete="off" onSubmit={formSubmitHandle}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div> 
        </div>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Nome Completo" 
        name="nomeCompleto" 
        value={values.nomeCompleto}
        onChange={inputChange}
        />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Telefone" 
          name="telefone" 
          value={values.telefone}
          onChange={inputChange}
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Email" 
          name="email" 
          value={values.email}
          onChange={inputChange}
          />
        </div>
      </div>
        
        <div className="form-group">
          <input type="submit" value={ props.currentId == "" ? "Salvar" : "Atualizar" } className="btn btn-primary col-md-12  mb-5" />
        </div>
    
    </form>
  )
}

export default RegisterForm

