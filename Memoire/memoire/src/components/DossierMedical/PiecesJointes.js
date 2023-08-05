import { useState, useRef, useEffect } from "react";
import { Grid, Typography, Button, Dialog, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//icons
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from "@mui/icons-material/Delete";



export default function PiecesJointes({ patient }) {

    const fileUploadInput = useRef()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [open, setOpen] = useState(false)
    const [preview, setPreview] = useState()
    const [selectedFileNames, setSelectedFileNames] = useState([])

    useEffect(() => {
        if (patient) {
            patient.pieces.forEach((piece) => {
                //const f = new File(Buffer.from('data:image/png;base64,'.concat(piece.fichier),'base64'),piece.nomFichier)
                const url = 'data:image/png;base64,'.concat(piece.fichier)
                fetch(url).then(res => res.blob()).then((blob) => {
                    var f = new File([blob], piece.nomFichier, { type: "image/png" })
                    setSelectedFiles((prev) => ([...prev, f]))
                    console.log(f)
                })



            })
        }
    }, [])

    const columnsPieces = [
        {
            field: 'name',
            headerName: 'Nom du fichier',
            width: 100,
            flex: 1
        },
        {
            field: '',
            headerName: 'Preview',
            width: 100,
            flex: 1,
            sortable: false,
            valueGetter: ({ row }) => {
                return row
            },
            renderCell: (params) => (
                <>
                    <img
                        onClick={(e) => {
                            setOpen(true)
                            setPreview(params.value)
                        }}
                        src={getUrl(params.value)}
                        width={150} />
                </>
            ),

        },
        {
            headerName: '',
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => {
                        const urlParams = {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": 'application/json'
                            },
                        }
                        fetch(process.env.BACK+'/supprimerFichier/'.concat(patient._id).concat('/').concat(params.row.name),urlParams)
                        .then(res=>res.json().then((resp)=>{
                            console.log(resp)
                            window.location.reload(false)
                        }))
                        .catch(e=>console.log(e))
                    }}
                    sx={{color:'red'}}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ]



    const handleFileChange = (e) => {
        let temp = selectedFiles.filter(file => true)
        let i = 0
        var formData = new FormData()
        console.log(formData, "init")
        while (i < e.target.files.length) {
            let exists = false

            temp.forEach((element) => {
                if (element.name === e.target.files[i].name) {
                    exists = true
                }
            })
            if (!exists) {
                temp.push(e.target.files[i])
            }

            i++
        }
        temp.forEach((t) => {
            formData.append(t.name, t)
        })
        setSelectedFiles(temp)
        let cpt = 0
        for (let x of formData.entries()) cpt++
        const urlParams = {
            method: 'POST',
            body: formData,
            // headers: {
            //     "Content-Type": 'multipart/form-data'
            // },
        }
        console.log(patient, 'ici patient')
        fetch(process.env.BACK+'/ajouterFichier/'.concat(patient._id).concat('/').concat(cpt), urlParams).then(res => res.json().then((data) => {
            console.log(data)
        }))
    }

    const getUrl = (file) => {
        try {
            if (!file) {
                console.log(typeof file)
                return ""
            } else {
                console.log('tessttttt')
                return URL.createObjectURL(file)
            }
        } catch (e) {
            console.log('error')
        }

    }


    return (
        <>
            <Dialog open={open} onClick={(e) => setOpen(false)} height='max-content' PaperProps={{ sx: { height: 'max-content', maxHeight: 'calc(100% - 30px);' } }}>
                <img src={getUrl(preview)} style={{ height: 'calc(100% - 30px);' }} />
            </Dialog>
            <Grid item xs={12} height='min-content' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Typography fullWidth align='center' variant='h6' sx={{ height: 'mix-content', backgroundColor: '#2d92b3' }}>Pieces Jointes
                </Typography>
                <input
                    ref={fileUploadInput}
                    id="pieces"
                    hidden
                    multiple
                    accept='image/*'
                    value={""}
                    type='file'
                    onChange={handleFileChange} />
                <Button onClick={() => { fileUploadInput.current.click() }}>
                    <AddIcon />
                </Button>

            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    columns={columnsPieces}
                    rows={selectedFiles}
                    getRowId={(row) => row.lastModified}
                    hideFooter
                    columnHeaderHeight='20px'
                    sx={{}} />
            </Grid>
        </>
    )
}