import './Video.scss'
import video from '../../assets/video-section.mp4'

export const Video = () => {
 return(
    <section id="video">
        <div className="video-wrapper flex">
            <video autoPlay={true} loop={true} muted="muted">
                <source src={video} type="video/mp4"></source>
            </video>
        </div>
    </section>
 )
}