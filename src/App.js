import './App.css';
import { github } from './Utils';
import Deatiles from './Copmonent/Deatils';
import Footer from './Copmonent/Footer';
import Repolist from './Copmonent/Repolist';
import Search from './Copmonent/Search';
import { useEffect } from 'react';
import { useState } from 'react';
import Follower from './Copmonent/Follower';
import Following from './Copmonent/Following';

function App() {
  const [Deatil, setDeatil] = useState({})
  // console.log(Deatil);
  const [repo, setRepo] = useState([]);
  // console.log(repo);
  const [Follers, setFollers] = useState([]);
  // console.log(Follers);
  const [following, setFollowing] = useState([]);
  // console.log(following);
  const [userName, setUserName] = useState("")
  // console.log("hello" + userName);
  const [isSucessfull, setSucessfull] = useState(true);
  const [visibleComponet, setVisibleComponent] = useState(2);


  useEffect(_ => {
    setDeatil({});
    setSucessfull(true);
    if (userName === "") {
      return;
    }
    (async _ => {

      try {
        const response = await github.get(`/${userName}`);
        // console.log("response"+ response, response.data);
        setDeatil(response.data);
      } catch (e) {

        setSucessfull(false)
      }

    })();
  }, [userName]);

  useEffect(_ => {
    setRepo([]);
    if (userName === "") {
      return;
    }
    (async _ => {
      const response = await github.get(`/${userName}/repos`)
      setRepo(response.data);
    })()
  }, [userName])

  useEffect(_ => {
    setFollers([]);
    if (userName === "") {
      return;
    }
    (async _ => {
      const response = await github.get(`/${userName}/followers`);
      setFollers(response.data);

    })();
  }, [userName])

  useEffect(_ => {
    setFollowing([]);
    if (userName === "") {
      return;
    }
    (async _ => {

      const response = await github.get(`/${userName}/following`)
      setFollowing(response.data);
    })();
  }, [userName])

  const searchUserName = (keyWord) => {
    setUserName(keyWord)
  }


  const showLoadMore = _ => {
    if (visibleComponet === 1) {
      if (Follers.length === Deatil.followers) {
        return false;
      } else {
        return true;
      }
    } else if (visibleComponet === 2) {
      if (repo.length === Deatil.public_repos) {
        return false;
      } else {
        return true;
      }
    } else {
      if (following.length === Deatil.following) {
        return false;
      } else {
        return true;
      }
    }
  }




  
  const loadMoreData = async _ => {
    if(visibleComponet === 1) {
      const currentPages = Math.ceil(Follers.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${userName}/followers?page=${nextPage}`);
      const list = response.data;

      setFollers(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from follower list
    } else if(visibleComponet === 2) {
      const currentPages = Math.ceil(repo.length / 30);
      const nextPage = currentPages + 1;

      const response = await github.get(`/${userName}/repos?page=${nextPage}`);
      const list = response.data;

      setRepo(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from repo list
    } else {
      const currentPages = Math.ceil(following.length / 30);
      const nextPage = currentPages + 1;

      const response = await github.get(`/${userName}/following?page=${nextPage}`);
      const list = response.data;

      setFollowing(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from followng list
    }
  }


  return (

    <>
      <main>
        <Search searchUserName={searchUserName} isSucessfull={isSucessfull} />
        {Deatil.id === undefined ? (
          false
        ) : (
          <>
            <Deatiles Data={Deatil} changeVisibleComponet={setVisibleComponent} visibleComponet={visibleComponet} />
            {visibleComponet === 1 ? (

              <Follower Data={Follers} />

            ) : (
              visibleComponet === 2 ? (
                <Repolist Data={repo} />

              ) : (
                <Following Data={following} />

              )
            )}
            {
              showLoadMore () === true ? (
                <div className="card load-more">
                  <button onClick={loadMoreData}>Load More</button>
                </div>

              ) : (false)
            }


          </>

        )}

        <Footer />

      </main>

    </>
  );
}

export default App;
