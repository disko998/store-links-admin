import React from 'react'
import Dropzone from 'react-dropzone'
import { makeStyles, Box } from '@material-ui/core'

export default function Uploader({ uploadedFiles, onFilesDrop, multiple, imageWidth }) {
    const classes = useStyles()

    return (
        <div>
            {uploadedFiles ? (
                <div>
                    <h3>Uploaded file(s):</h3>
                    <Box
                        justifyContent='flex-start'
                        alignItems='center'
                        display='flex'
                        flexDirection='row'
                        flexWrap='wrap'
                    >
                        {uploadedFiles.map(url => (
                            <div
                                className={classes.imageBox}
                                style={{
                                    backgroundImage: `url(${url})`,
                                    width: imageWidth || 150,
                                }}
                            ></div>
                        ))}
                    </Box>
                </div>
            ) : (
                <Dropzone accept='image/*' multiple={multiple} onDrop={onFilesDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={classes.dropZone}>
                            <input {...getInputProps()} />
                            <p>
                                Drag 'n' drop some images here, or click to select images
                            </p>
                        </div>
                    )}
                </Dropzone>
            )}
        </div>
    )
}

const useStyles = makeStyles({
    dropZone: {
        background: '#e0e0e0',
        height: 100,
        width: '100%',
        cursor: 'pointer',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },

    imageBox: {
        height: 200,
        overflow: 'hidden',
        margin: 10,
        backgroundRepeat: ' no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: 5,
    },
})
