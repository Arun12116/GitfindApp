const Follower=({Data})=>{

return(

    <>
    <div className="card  followers-list">
        <h2>Follower List</h2>
        <table>

                    <thead>

                        <tr>

                            <th>#</th>
                            <th colSpan={2}>Name</th>
                        </tr>
                    </thead>
                </table>
                <tbody>
                    {
                       Data.map((element,idx)=>{
                        console.log(element);
                        return(

                            <>
                            <tr key={idx}>
                                <td>{idx+1}</td>
                                <td><img src={element.avatar_url} alt="profile" /></td>
                                <td>
                                    <a href={element.html_url} target="/blank">
                                    {element.login}

                                    </a>
                                    
                                    
                                
                                
                                </td>

                            </tr>
                            
                            </>
                        )
                       })
                    }

                </tbody>

    </div>
    
    </>
)



}
export default Follower;