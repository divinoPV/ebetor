import ImageItem from '../../../Atoms/Images/Items/ImageItem';
import styles from './TeamItem.module.scss';

const TeamItem = ({ alt, children, className, src, team, ...rest }) =>
  <div className={`${styles['TeamItem']}`}>
    <div className={`${styles['TeamItem__leading']}`}>
      {src &&
        <div className={`${styles['TeamItem__leading__image']}`}>
          <ImageItem alt={alt} className={className} src={src} {...rest} />
        </div>
      }
      <div className={`${styles['TeamItem__leading__info']}`}>
        <strong className={`${styles['TeamItem__leading__title']}`}>
          {team.name} {team.acronym && '- ' + team.acronym}
        </strong>
        {team.location &&
          <span className={`${styles['TeamItem__leading__location']}`}>
            Team provenant de {team.location}
          </span>
        }
      </div>
    </div>
    {team.players.length !== 0 &&
      <div className={`${styles['TeamItem__players']}`}>
        <strong>Les joueurs :</strong>
        {team.players.map(player =>
          console.log(player) ||
          <div key={player.id} className={`${styles['TeamItem__player']}`}>
            {player.image_url &&
              <div className={`${styles['TeamItem__player__image']}`}>
                <ImageItem alt={`Photo du joueur ${player.name}`} src={player.image_url} />
              </div>
            }
            <div className={`${styles['TeamItem__player__info']}`}>
              {(player.first_name || player.last_name || player.name) &&
                <strong className={`${styles['TeamItem__player__name']}`}>
                  {player.first_name} {player.last_name} {player.name && ((player.first_name && player.last_name) ? 'aka ' : '') + player.name}
                </strong>
              }
              {player.hometown && <span className={`${styles['TeamItem__player__hometown']}`}>{player.hometown}</span>}
              {(player.age || player.birthday) &&
                <span className={`${styles['TeamItem__player__birthday']}`}>
                  {player.age && player.age + 'ans '}{player.birthday && 'né le ' + player.birthday}
                </span>
              }
            </div>
          </div>
        )}
      </div>
    }
    {children}
  </div>
;

export default TeamItem;
