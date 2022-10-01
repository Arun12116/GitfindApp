import moment from 'moment';
const Deatiles = ({ Data, changeVisibleComponet, visibleComponet }) => {
  // console.log(deatiles);
  return (

    <>
      <div className="card detail">

        <img src={Data.avatar_url} alt="profile" className="section-left" />
        <div className="section-right">
          <h2>{Data.name}</h2>
          <a href={Data.html_url} target="/blank"  >
            @{Data.login}
          </a>
          <p>Member Since: {moment(Data.created_at).fromNow()}</p>

        </div>
        <div className="buttons">

          <button onClick={_ => changeVisibleComponet(1)} className={visibleComponet === 1 ? "active" : ""}>{Data.followers}
            <span>Follower</span>
          </button>
          <button onClick={_ => changeVisibleComponet(2)} className={visibleComponet === 2 ? "active" : ""}> {Data.public_repos}
            <span>repo</span>
          </button>
          <button onClick={_ => changeVisibleComponet(3)} className={visibleComponet === 3 ? "active" : ""}>{Data.following}
            <span>following</span>
          </button>
        </div>

      </div>
    </>
  )
}
export default Deatiles;