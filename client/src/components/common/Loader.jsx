import './loader.css'

export default function Loader({text="Loading...", className=""}){
    return(
        <div className={`loader-wrapper ${className}`}>
            <div className='loader-spinner'></div>
            <p className='loader-text'>{text}</p>
        </div> 
    )
}