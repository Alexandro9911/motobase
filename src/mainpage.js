import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function About() {
    return (
        <div className="card bg-dark text-white">
            <img src={require('./images/moto_background.jpg')} className="card-img" alt="..."/>
            <div className="card-img-overlay">
                <div className="container">
                    <div className="backgroundsmooth">
                        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active" align={"center"}>
                                        <img src={require('./images/first.jpg')} className="d-block w-50" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Motodase</h5>
                                        <p>Это современный сервис, который позволяет честно и безопасно совершать
                                            покупки мотоциклов</p>
                                    </div>
                                </div>
                                <div className="carousel-item" align={"center"}>
                                    <img src={require('./images/second.jpg')} className="d-block w-50" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Мечты сбываются</h5>
                                        <p>Мы поможем вам найти тот мотоцикл, о котором вы мечтаете</p>
                                    </div>
                                </div>
                                <div className="carousel-item" align={"center"}>
                                    <img src={require('./images/third.jpg')} className="d-block w-50" alt="..."/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Не важно какой у вас мотоцикл</h5>
                                        <p>Ездите вы на скутере, электробайке, не имеет значения! У нас найдется место
                                            для каждого</p>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                        <div className='card-small'>
                           <h3>Motobase - это будущее рынка мотциклов</h3>
                            <div className='dropdown-divider'/>
                            <h6>Доверя нам, вы создаете безопасную платформу, которая позволяет не попасть в уловки мошенников
                            при продаже мотоциклов
                            (конечно нет, это просто текст, зачем он тут не знаю, но выглядит красиво)</h6>
                        </div>
                        <br/>
                        <div className='dropdown-divider'/>
                        <div className='wrapper3'>
                            <h4>Что наш сервис позволяет</h4>
                        </div>
                        <div className='grid-container'>

                                <div className='card-small'>
                                    <h4>Настоящая история</h4>
                                    <div className='dropdown-divider'/>
                                    <h6>При выборе мотоцикла обязательно указана настоящая история мотоцикла и его предыдущие владельцы</h6>
                                </div>


                                <div className='card-small'>
                                    <h4>Заключение сделок</h4>
                                    <div className='dropdown-divider'/>
                                    <h6>Понравился мотоцикл и готовы купить? Оформите сделку, и не бойтесь что его купят первее вас!</h6>
                                </div>


                                <div className='card-small'>
                                    <h4>Учебный проект</h4>
                                    <div className='dropdown-divider'/>
                                    <h6>Этот проект является учебным и ничего не гарантирует. Это сделано просто так</h6>
                                </div>


                                <div className='card-small'>
                                    <h4>Только мототехника</h4>
                                    <div className='dropdown-divider'/>
                                    <h6>Еще одна удобная платформа для мотоциклистов. И никаких перекупщиков</h6>
                                </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;

