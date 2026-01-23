import img from './error.gif'


const ErrorMessage = () => {
    return(
        //this is construction of importing something from public
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="errorGif" />
        <img style={{display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto"}}  src={img} alt="errorGif"/>
    )
}

export default ErrorMessage