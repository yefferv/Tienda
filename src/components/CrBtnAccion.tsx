import { IconButton } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';



interface Props {
    isCheck : boolean
    handleCheck? :() => void
    handleShow? :() => void
    handleAddCard? :() => void
    isShow?: boolean
    visibleBtnDelete?:boolean
}

const CrBtnAccion = ({isCheck,handleCheck,handleShow,handleAddCard,isShow = false, visibleBtnDelete = false}:Props) => {
    
    

  return (
    <>
        {isShow ? 
        (
        <IconButton onClick={handleShow}>
            <RemoveRedEyeIcon color='primary' ></RemoveRedEyeIcon>
        </IconButton>
      ) :
       
        (
          visibleBtnDelete ? (
            <IconButton onClick={handleCheck}>
              <DeleteIcon />
            </IconButton>
        ) : (<IconButton onClick={handleCheck}>{
          isCheck ?  <LibraryAddIcon color='primary'/> : <LibraryAddCheckIcon color='success'/>
          }
          </IconButton>)
      )}            

    </>

  )
}

export default CrBtnAccion
