import Clock from "../components/Clock";
import Navbar2 from '../components/Navbar2';

export default function Home(){
    return (
        <section>
            <>
                <div className='backgroundColor'> 
                    <Navbar2></Navbar2>
                    <div  className='container-MainContent'>
                        <Clock></Clock>
                    </div>
                </div>
            
            {/* <h1>Övergripande information</h1> */}
            </>
            
        </section>
    );
  };