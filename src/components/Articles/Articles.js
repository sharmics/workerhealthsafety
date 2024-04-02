import "./Articles.css"

function Articles({articleData}) {
    return(
        <div className="articles-outer-cnt">
            <div className="articles-header-cnt">
                <span>Articles</span>
            </div>
            <div className="articles-inner-cnt">
                {articleData.map((article, index) => 
                    <div className="articles-title-desc-cnt" style={{ borderBottom: index == articleData.length - 1 ? "none" : "1px solid #C7C7C7"}} >
                        <span className="articles-title-cnt">{article.title}</span>
                        <div className="articles-desc-cnt">
                            <span>{article.desc}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Articles