import Header from "../../components/Header/Header";
import backgroundimg from "../../assets/images/background.png"
import "../Home/style.css"
import ItemList from "../../components/ItemList/ItemList";
import { useState } from "react";


export default function App() {

  const [user, setUser] = useState('');

  const [currentUser, setCurrentUser] = useState(null);

  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length){
        setRepos(newRepos);
        console.log('preencheu')
      }
    }
  }


  return (
    <div>
      <Header/>
        <div className ="conteudo">
            <img src = {backgroundimg}  
            alt = "App Background" 
            className ="background"/>

            <div className="info">
              <div>
                <input name = "user" 
                placeholder = "username" 
                value = {user} 
                onChange={event => setUser(event.target.value)}
                />
                <button onClick={handleGetData}>Search</button>
              </div>

            { currentUser?.name ? (
              <>
              <div className = "profile">
                <img src = {currentUser.avatar_url} 
                alt = "Profile Pic"
                className = "profilePic"/>

                <div>
                  <h3> {currentUser.name} </h3>
                  <span> @{currentUser.login} </span>
                  <p> {currentUser.bio} </p>
                </div>
            
              </div>
              
              <hr/>

              </> ) : null }

              

              { repos?.length? (
                
              <div>
                <h4 className="portfolio">Portfólio</h4>
                {repos.map((rep) => {
                  console.log(repos.name)
                  return(
                    <ItemList title = {rep.name} description = {rep.description}/>
                  )
                })}
              </div>

              ) : null }

            </div>

        </div>
    </div>
  );
}


