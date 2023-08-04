import { Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
function EvolutionRecette({evolution}) {
  return (
    <>
    {evolution!=-1&&evolution!=0 &&
    <Typography variant='span' style={{fontSize:'10px'}} display='flex' flexDirection='column' justifyContent='center'>
        <strong><Typography variant='span' style={{color:evolution>0?'#00ff55':'#ff7700'}}>{evolution>0?<TrendingUpIcon/>:<TrendingDownIcon/>}{parseInt(evolution)}%</Typography>Par rapport á hier </strong></Typography>}
        </>
  )
}

export default EvolutionRecette