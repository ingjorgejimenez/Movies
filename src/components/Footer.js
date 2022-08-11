import link from '../img/linkedin.png';
import git from '../img/git.png';
import what from '../img/whasapp.png';

function Footer() {
    return (
        <footer className="d-flex gap-5 bg-dark justify-content-center text-white mt-2">

            <div className="container-xxl bg-dark text-center">
                <div className='row footer py-3 align-items-center'>

                    <div className="col-md-4 ">
                        <span className='mx-4'>WebSite-Movies</span>
                    </div>
                    <div className="col-md-4">

                        <a className='mx-4' href={`https://www.linkedin.com/in/ing-jorge-jimenez/`}><img width={30} src={link} /></a>
                        <a className='mx-4' href={`https://wa.me/+573183296814`}><img width={30} src={what} /></a>
                        <a className='mx-4' href={`https://github.com/ingjorgejimenez`}><img width={30} src={git} /></a>

                    </div>
                    <div className="col-md-4">
                        <span>
                            © 2022 Movies | Jorge Jimenez.
                        </span>

                    </div>
                </div>
            </div>

        </footer>
    )
}
export default Footer;