import ImageItem from '../../../Atoms/Images/Items/ImageItem';
import styles from './ChampionItem.module.scss';

const ChampionItem = ({ champion, game }) => {
  return <div className={`${styles['ChampionItem']}`}>
    {(champion.image_url || champion.portrait_url) &&
      <div className={`${styles['ChampionItem__image']}`}>
        <ImageItem alt={`Image du champion ${champion.name}`} src={game === 'valorant' ? champion.portrait_url : champion.image_url} />
      </div>
    }
    <div className={`${styles['ChampionItem__info']}`}>
      <strong className={`${styles['ChampionItem__name']}`}>{game === 'dota-2' ? champion.localized_name : champion.name}</strong>
      {(game === 'ow' || game === 'league-of-legends') &&
        <span>Stats :</span>
      }
      {game === 'league-of-legends' &&
        <div className={`${styles['ChampionItem__stats']}`}>
          <span>Attaque : {champion.attackdamage}</span>
          <span>Distance d'attaque : {champion.attackrange}</span>
          <span>Vie : {champion.hp}</span>
          <span>Armure : {champion.armor}</span>
          <span>Armure magique : {champion.spellblock}</span>
          <span>Vitesse de déplacement : {champion.movespeed}</span>
          <span>Regénération de vie : {champion.hpregen}</span>
        </div>
      }
      {game === 'ow' &&
        <div className={`${styles['ChampionItem__stats']}`}>
          <span>Nom réel : {champion.real_name}</span>
          <span>Rôle : {champion.role}</span>
          <span>Difficulté de prise en main : {champion.difficulty}</span>
        </div>
      }
    </div>
  </div>;
};

export default ChampionItem;
