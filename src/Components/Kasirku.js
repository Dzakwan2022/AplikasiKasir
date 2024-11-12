import 'bootstrap/dist/css/bootstrap.min.css';
import produk from '../Data/Barang';
import aang from '../assets/aang.png';
import { Cuaca } from '../Components/Cuaca';
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { PiPrinterFill } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { GiBoxingGlove } from "react-icons/gi";
import { Modal, Button } from 'react-bootstrap';
import { LuCalendarDays } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";

function Kasir() {
    
    const [jumlah, setJumlah] = useState(0);
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState([]);
    const [liatStruk, setLiatStruk] = useState(false);

    const now = new Date();
    const tanggal = format(now, ' dd-MM-yyyy');
    const waktu = format(now, ' hh:mm:ss');

    const kurang = (id) => {
        setJumlah(Jumlah => ({...Jumlah,[id]: Jumlah[id] > 0 ? Jumlah[id] - 1 : 0}));      
    };

    const tambah = (id) => {
        setJumlah(Jumlah => ({...Jumlah,[id]: (Jumlah[id] || 0) + 1}));
    };

    const cetak = () => {
        if (nama) {
            const struck = produk.map(item => {
                const qty = jumlah[item.id];
                const subTotal = qty * item.harga;
                return qty > 0 ? { ...item, qty, subTotal } : null;
            }).filter(item => item);
            setHarga(struck);
            setLiatStruk(true); 
        } else {
            alert("Name Required");
        }
    };

    const total = harga.reduce((total, item) => total + item.subTotal, 0);    

    return (
        <>
        <div className="heading">
            <div className="navbar fixed-top">
                <h1><GiBoxingGlove /> AngPed</h1>             
                <img src={aang} alt="aang" />   
                <h4><Cuaca /></h4>
            </div>
            <div className="cardd">
               <div className="row justify-content-center">
                {produk.map(item => (
                    <div className="col-md-2 mb-4 mt-3" key={item.id}>
                        <div className="card text-center align-items-center">
                            <img src={item.Image} alt={item.namaBarang} />
                            <div className="card-body">
                                <h2 className="card-title">{item.namaBarang}</h2>
                                <h5 className="card-text">Rp.{item.harga.toLocaleString()}</h5>
                            </div>
                            <div className="pb-2">
                                <button className="btn btn-danger" onClick={() => kurang(item.id)}><FaMinus /></button>
                                <b className="mx-2">{jumlah[item.id] || 0}</b>
                                <button className="btn btn-primary" onClick={() => tambah(item.id)}><FaPlus /></button>
                            </div>
                        </div>
                    </div>
                ))}
                </div> 
            </div>
            
            <div className="input-nama mt-3 d-flex ">
                <h2>Name Customer  <IoPeopleSharp /> : </h2>
                <input type="text" placeholder="Input Name" className="form-control form-control mb-3 " 
                onChange={(event) => setNama(event.target.value)} /> 
            </div>
            <div className="date">
                <p><b><LuCalendarDays /> {tanggal} <br /> <IoMdTime /> {waktu}</b></p>
            </div>
            <div className="boton">
                <button className="btn btn-warning btn-lg" onClick={cetak}>SeeReceipt <IoReceiptOutline /> </button>
            </div>


            <Modal show={liatStruk} onHide={() => setLiatStruk(false)} size="s">
                <Modal.Body>
                    <div className="struk"> 
                        <div className="logo">
                            <h4>AngPed</h4>
                            <img src={aang} alt="aang" />
                        </div>
                        <br />
                        <p>
                            Jln.Golf 3 No.1 Rw1/Rt3
                            Kota Bandung Jawa Barat    
                            <hr className="dashed" />
                            <div className='text-start'>
                            <table>
                                <tr>
                                    <td>Invoice</td>
                                    <td>:</td>
                                    <td>{tanggal} {waktu}</td>
                                </tr>
                                <tr>
                                    <td>Nama Customer</td>
                                    <td>:</td>
                                    <td>{nama}</td>
                                </tr>
                                <tr>
                                    <td>Kasir</td>
                                    <td>:</td>
                                    <td>Master #3</td>
                                </tr>
                            </table>
                            </div>
                        </p>
                        <hr className="dashed" />
                        <div className="isi">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>QTY</th>
                                        <th>Harga</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {harga.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.namaBarang}</td>
                                        <td>{item.qty}</td>
                                        <td>Rp.{item.harga.toLocaleString()}</td>
                                        <td>Rp.{item.subTotal.toLocaleString()}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" align="left"><b>Total Harga :</b></td>
                                    <td>Rp.{total.toLocaleString()}</td>
                                </tr>
                                </tbody>
                            </table> 
                            <hr className="dashed" />
                            <div className="struk-info">                            
                                <p>
                                    Terima Kasih Telah Berbelanja Di toko Kami<br />
                                    Layanan Konsumen Call 021-02981 || Sms 021-02981<br />
                                    WebSite Kami : AangPedia.com<br />
                                    Email : aangpedia@gmail.com
                                </p>
                                <hr className="dashed" />
                                <b><center>Terima Kasih</center></b>
                                <hr className="dashed" />
                            </div>
                        </div>  
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning">
                        Payments <MdOutlinePayments />
                    </Button>
                    <Button variant="success" onClick={() => window.print()}>
                        Print <PiPrinterFill />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
}

export default Kasir;
