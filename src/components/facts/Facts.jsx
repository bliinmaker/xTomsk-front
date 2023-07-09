import './Facts.scss'

export const Facts = () => {
 return (
    <section id="facts" className="py-4 flex">
        <div className="container">
            <div className='title-wrap'>
                <h2 className="lg-title">интересные факты</h2>
            </div>

            <div className="facts-row">
                <div className="facts-item">
                    <div className="facts-info">
                        <p className="text">Улицы Томска украшает множество деревянных построек, возведенных преимущественно
                            в конце 19 века.</p>
                    </div>
                </div>

                <div className="facts-item">
                    <div className="facts-info">
                        <p className="text">Солнце в Томске светит 2048 часов в году, то есть почти половину возможного
                            времени.</p>
                    </div>
                </div>

                <div className="facts-item">
                    <div className="facts-info">
                        <p className="text">Томск впервые вышел на связь через Интернет во время путча в 1991 году.</p>
                    </div>
                </div>

                <div className="facts-item">
                    <div className="facts-info">
                        <p className="text">Томск был четвертым российским городом, где началось телевещание.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
 )
}