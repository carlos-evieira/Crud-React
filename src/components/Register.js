import React, {useState, useEffect} from 'react'
import RegisterForm from './RegisterForm'
import fireDb from '../database/firebase'

const Register = () => {
  let [userData, setUserData] = useState({})
  let [currentId, setCurrentId] = useState('')

  //Função para listar as informações que estão no banco de dados
  useEffect(() => {
    fireDb.child('usuarios').on("value", dbSnapshot => {
      if(dbSnapshot.val() != null) {
        setUserData({ 
          ...dbSnapshot.val(),
          
        })
      }else {
        setUserData({})
      }
    })
  }, [])

  //Função para persistir informações no banco de dados
  const addEdit = obj => {
   // se o Id atual estiver vazio ele preencherá 
   //com o id clicado. 
    if(currentId == "") {
      console.log(obj)
      fireDb.child('usuarios').push(
          obj,
          error => {
            if(error){
              console.log(error)
            }else {
              setCurrentId('')
            }
          }
        )
  //Se estiver com dados, 
  //irá atualizar os dados do usuario e persistir no banco de dados
    }else {
      fireDb.child(`usuarios/${currentId}`).set(
          obj,
          err => {
            if(err) {
              console.log(err)
            }else {
              setCurrentId('')
            }
          }
      )
    }
  }

  // função para  deletar o usuario
  const userDelete = key => {
    if(window.confirm("Deseja realmente deletar esse cadastro ?")) {
      fireDb.child(`usuarios/${key}`).remove(
        err => {
          if(err) {
            console.log(err)
          }
        }
      )
    }
  }


  return (
    <>
      <div className="jumbotron jumbotron">
        <div className="container">
          <h1 className="display-4" align="center">Cadastro de Usuários</h1>
        </div>
      </div>

      <div>
        <div className="row" >
          <div className="col-md-12">
              <RegisterForm {...({addEdit, currentId, userData})} />
          </div>
          <div className="table">
            <div className="col-md-12">
              <table className="table table-border table-stripped">
                <thead className="thead-dark">
                  <tr >
                    <th >Nome </th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th className="action">Ação</th>
                    <th ></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(userData).map(id =>{
                      return <tr key={id}>
                        <td> {userData[id].nomeCompleto} </td>
                        <td> {userData[id].telefone} </td>
                        <td> {userData[id].email} </td>
                        <td className="button"> 
                          <a className="btn btn-primary"><i className="fas fa-pencil-alt" onClick={ () => {setCurrentId(id)} }></i></a>
                        </td>
                        <td className="button" > 
                          <a className="btn btn-danger"><i className="fas fa-trash-alt" onClick={ () => userDelete(id) }></i></a>
                        </td>
                       
                      </tr>
                    })
                  }
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register


