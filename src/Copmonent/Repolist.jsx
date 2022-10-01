const Repolist = ({Data}) => {
    // console.log(Data);
    return (
        <>
            <div className="card repo-list">
            <h2>Repo list</h2>
                <table>
                    <thead>
                    <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
                    </thead>
                    <tbody>

                    {Data.map((element, idx) => {
                        return (
                            <>
                            <tr key={idx}>
                                <td>{idx+1}</td>
                            <td >
                                    <a href={element.html_url} target="_blank" rel="noreferrer" >
                                        {element.name}
                                    </a>
                                </td>
                            </tr>
                             
                            </>
                        );
                    })}
 </tbody>

                </table>
            </div>
        </>
    )
}
export default Repolist;