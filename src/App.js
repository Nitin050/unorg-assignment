import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import RightDrawer from './components/rightDrawer';
import {useState, useEffect, forwardRef} from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [items, setItems] = useState([]);
  const [newItemID, setNewItemID] = useState('');

  const getData = () => {
    axios.get(' https://www.onlinethela.online/assignment/api/items')
    .then((res)=>{
      setItems([...res.data.data]);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if(!rightDrawerOpen){
      setDataToEdit('');
    }
  }, [rightDrawerOpen])


  const handleDelete = () => {
    setBottomDrawerOpen(true);
  }

  const openEdit = (data) => {
    setDataToEdit({...data});
    setRightDrawerOpen(true);
  }

  const handleSave = (data='') => {
    if(dataToEdit){
      axios.patch(`https://www.onlinethela.online/assignment/api/items/${dataToEdit.id}`,{
        "item_name":data.name,
        "item_unit":data.unit,
        "item_weight":data.weight,
        "item_quantity":data.quantity
      })
      .then(()=>{
        setRightDrawerOpen(false);
        getData();
        setToastMsg('Edited Successfully!');
      })
    }else{
      axios.post(' https://www.onlinethela.online/assignment/api/items',{
        "item_name":data.name,
        "item_unit":data.unit,
        "item_weight":data.weight,
        "item_quantity":data.quantity
      })
      .then((res)=>{
        setRightDrawerOpen(false);
        getData();
        setToastMsg('Added Successfully!');
        setNewItemID(res.data.vechicleinfoid);
        setTimeout(() => {
          setNewItemID('');
        }, 5000);
      })
    }

  }

  const onDeleteClose = () => {
    setDataToEdit('');
    setBottomDrawerOpen(false);
  }

  const openDelete = (data) => {
    setDataToEdit({...data});
    setBottomDrawerOpen(true);
  }
  
  const onDelete = () => {
    axios.delete(`https://www.onlinethela.online/assignment/api/items/${dataToEdit.id}`)
    .then(()=>{
      onDeleteClose();
      getData();
      setToastMsg('Deleted Successfully!');
    })
  }
  

  return (
    <div className="App">
      <Header />
      <div className='mainCard'>
        <div className='topBar'>
          <div className='title'>
            Items
            <img src={process.env.PUBLIC_URL + 'Icons/Refresh.svg'} />
          </div>
          <div className='btn'>
            <Button disabled={newItemID} className={newItemID && 'disabled'} onClick={()=>setRightDrawerOpen(true)} variant="contained" color='info' endIcon={<img src={process.env.PUBLIC_URL + 'Icons/Add.svg'} />}>
              Add Item
            </Button>
          </div>
        </div>

        <TableContainer className='dataTable'>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{fontWeight: 'bold'}}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>UNIT</TableCell>
                <TableCell>WEIGHT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.name}
                  className={newItemID==row.id && 'new'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.item_name}</TableCell>
                  <TableCell>{row.item_quantity}</TableCell>
                  <TableCell>{row.item_unit}</TableCell>
                  <TableCell>{row.item_weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer className='btnTable'>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell onClick={()=>openEdit({...row})} className='edit'>
                    <img src={process.env.PUBLIC_URL + 'Icons/EditIcon.svg'} />
                  </TableCell>
                  <TableCell onClick={()=>openDelete(row)} className='delete'>
                    <img src={process.env.PUBLIC_URL + 'Icons/Delete.svg'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>

        <RightDrawer
          rightDrawerOpen={rightDrawerOpen}
          setRightDrawerOpen={setRightDrawerOpen}
          data={dataToEdit}
          handleSave={handleSave}
        />

        <Drawer
          anchor={'bottom'}
          open={bottomDrawerOpen}
          className='bottomDrawer'
          sx={{
            textAlign: 'left',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', height: '200px', marginLeft: '200px' },
          }}
          onClose={onDeleteClose}
        >
          <div className='topBar'>
            <div className='title'>
              ARE YOU SURE?
            </div>
            <div className='btn' onClick={onDeleteClose}>
              <img src={process.env.PUBLIC_URL + 'Icons/cross.png'} />
            </div>
          </div>
          <div className='btns'>
            <Button disableElevation color='success' variant="contained" onClick={onDelete}>Confirm</Button>
            <Button disableElevation color='error' variant="contained" onClick={onDeleteClose}>Cancel</Button>
          </div>
        </Drawer>

        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={toastMsg ? true : false} autoHideDuration={2000} onClose={()=>setToastMsg('')}>
          <Alert onClose={()=>setToastMsg('')} severity="success" sx={{ width: '100%' }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default App;
