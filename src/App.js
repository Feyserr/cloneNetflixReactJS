import React, {useEffect, useState} from 'react';
import {getHomeList, getMovieInfo} from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';

export const App =() =>{
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  
  
  useEffect(()=>{
    const loadAll = async()=>{
      //pegando a lista total
      let list = await getHomeList();
      setMovieList(list);

      //Pegando o featured 
      let originals = list.filter(i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    
    loadAll();

  }, []);
  
  
  return (
    <div className="page">


      {featureData && 
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((items, key)=>(
          <MovieRow key={key} title = {items.title} items={items.items}/>
          
        ))}
      </section>
    </div>
  );
}
