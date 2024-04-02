import FileIcon from "../../assets/doc.svg"
import DocumentIcon from "../../assets/doc2.svg"
import AttachIcon from "../../assets/attached.svg"
import ViewIcon from "../../assets/eye.svg"
import "./AttachedResultsCard.css"

function AttachedResultsCard({AttachedResultsData}) {
    return (
        <div className="attached-results-card-cnt">
            <div className="attached-results-card-title">
                <span>Attached Results</span>
            </div>
            <div className="attached-results-details-cnt">
                {AttachedResultsData?.map(result => 
                    <div className="attached-result-details-action-cnt">
                        <div className="attached-result-icon-title-cnt">
                            <img src={result?.type == "file" ? FileIcon : DocumentIcon} />
                            <span>{result.doc_name}</span>
                        </div>
                        <div className="attached-results-source-action-cnt">
                            <span>{result.source}</span>
                            <div className="attached-results-action-cnt">
                                <img src={AttachIcon} alt="File Attach Icon"/>
                                <img src={ViewIcon} alt="File View Icon"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AttachedResultsCard