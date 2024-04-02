import { useNavigate } from "react-router"
import "./BreadcrumbsContainer.css"

function BreadcrumbsContainer({ BreadcrumbsData }) {
    const navigate = useNavigate()

    const handleBreadcrumbsNavigation = (route) => {
        navigate(route)    
    }

    return (
        <div className="bread-crumbs-cnt">
            {BreadcrumbsData?.map((breadcrumbObj, index)=>
                <div className="bread-crumbs-path" style={{cursor: index < BreadcrumbsData.length - 1 ? "pointer" : "default"}}>
                    <span style={{color: index === BreadcrumbsData.length - 1 ? "#000000" : "#000000A1"}} onClick={()=> handleBreadcrumbsNavigation(breadcrumbObj.route)}>{breadcrumbObj.breadcrumbOption}</span>
                    {index < BreadcrumbsData.length - 1 && <span> &gt;</span>}    
                </div> 
            )}
        </div>
    )
}

export default BreadcrumbsContainer