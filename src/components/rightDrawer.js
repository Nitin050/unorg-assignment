import * as React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';


function RightDrawerComp({data='', rightDrawerOpen, setRightDrawerOpen, handleSave}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [unit, setUnit] = React.useState(0);
  const [unitsList, setUnitsList] = React.useState([]);
  const [weight, setWeight] = React.useState('');
  // const units = ['g','Kg','L','ml','pkt'];

  const onSave = async() => {
    await handleSave({
      name, quantity, unit, weight
    });
  }

  React.useEffect(() => {
    if(rightDrawerOpen){
      onReset();
    }
  }, [rightDrawerOpen])

  React.useEffect(() => {
    axios.get(' https://www.onlinethela.online/assignment/api/units')
    .then((res)=>{
      setUnitsList([...res.data.data]);
    })
  }, [])

  const onReset = () => {
    if(data){
      console.log(data)
      setName(data.item_name);
      setQuantity(data.item_quantity);
      setUnit((data.item_unit));
      setWeight(data.item_weight);
    }else{
      setName('');
      setQuantity('');
      setUnit(0);
      setWeight('');
    }
  }

  return (
    <Drawer
      anchor={'right'}
      open={rightDrawerOpen}
      className='rightDrawer'
      sx={{
        textAlign: 'left',
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '500px' },
      }}
      onClose={()=>setRightDrawerOpen(false)}
    >
      <div className='topBar'>
        <div className='title'>
          {data ?
            <>
              EDIT ITEM
              <img src={process.env.PUBLIC_URL + 'Icons/EditIcon.svg'} />
            </>
          :
            <>
              ADD ITEM
              <img src={process.env.PUBLIC_URL + 'Icons/Edit.svg'} />
            </>
          }
        </div>
        <div className='btn' onClick={()=>setRightDrawerOpen(false)}>
          <img src={process.env.PUBLIC_URL + 'Icons/cross.png'} />
        </div>
      </div>

      <div className='form'>
        <div className='label'>Item Name</div>
        <OutlinedInput
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type={'text'}
        />

        <div className='label'>Quantity</div>
        <OutlinedInput
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
          type={'number'}
        />

        <div className='label'>Unit</div>
        <Select
          value={unit || 0}
          onChange={(e)=>setUnit(e.target.value)}
        >
          <MenuItem value={0}>Select Unit</MenuItem>
          {unitsList.map(u=>(
            <MenuItem value={u.name}>{u.name}</MenuItem>
          ))}
        </Select>

        <div className='label'>Weight</div>
        <OutlinedInput
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
          type={'number'}            
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
        />

        <div className='btns'>
          <Button variant="outlined" onClick={()=>setRightDrawerOpen(false)}>Cancel</Button>
          <Button onClick={onReset} variant="outlined">Reset</Button>
          <Button onClick={onSave} disableElevation variant="contained" endIcon={<img src={process.env.PUBLIC_URL + 'Icons/Add.svg'} />}>Save</Button>
        </div>

      </div>
      

    </Drawer>

  );
}
export default RightDrawerComp;