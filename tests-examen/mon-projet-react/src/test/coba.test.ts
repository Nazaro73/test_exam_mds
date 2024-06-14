import { getScoreEquipe, trouverPartitionEgale } from '../module/fonction';
import { expect, describe, it } from 'vitest';


describe('getScoreEquipe', () => {

    describe('unique', () => {
        it('retourne 1 quand vert seul', () => {
            expect(getScoreEquipe(['vert'],1)).toBe(1);
        });
        it('retourne 2 quand gris seul', () => {
            expect(getScoreEquipe(['gris'],1)).toBe(2);
        });
        it('retourne 1 quand orange seul', () => {
            expect(getScoreEquipe(['orange'],1)).toBe(1);
        });
        it('retourne -1 quand jaune seul', () => {
            expect(getScoreEquipe(['jaune'],1)).toBe(-1);
        });
        it('retourne 3 quand rose seul', () => {
            expect(getScoreEquipe(['rose'],1)).toBe(3);
        });
        it('retourne 4 quand bleu seul et equipe adverse compte 4 dés', () => {
            expect(getScoreEquipe(['bleu'],4)).toBe(1);
        });
    })

    describe('orange role', () => {
        it('retourne valeur avec nombre paire ', () => {
            expect(getScoreEquipe(['orange','vert'],1)).toBe(2+1);
        });
        it('retourn 7 avec un rose qui pourrai supprimé le vert ', () => {
            expect(getScoreEquipe(['orange','vert','rose','gris'],1)).toBe(2+0+3+2);
        });
        
    })
    describe('rose role', () => {
        it('should return 4 when 1 vert ', () => {
            expect(getScoreEquipe(['rose','vert'],1)).toBe(3+0);
        });
        it('should return 4 when 1 gris', () => {
            expect(getScoreEquipe(['rose','vert','orange'],1)).toBe(3+0+0);
        });
        it('should return 4 when 1 violet', () => {
            expect(getScoreEquipe(['rose','rose'],1)).toBe(3+3);
        });
        it('should return 4 when 1 violet', () => {
            expect(getScoreEquipe(['rose','vert','jaune'],1)).toBe(3+1+0);
        });
        it('should return 4 when 1 violet', () => {
            expect(getScoreEquipe(['rose','vert','bleu'],0)).toBe(3+1+0);
        });
        
    })

    describe('bleu role', () => {
        it('should return 4 when 1 violet', () => {
            expect(getScoreEquipe(['rose','vert','jaune'],1)).toBe(3+1+0);
        });
        
    })

    describe('all role', () => {
        describe('simple role', () => {
            it('should return 4 when 1 vert ', () => {
                expect(getScoreEquipe(['vert','vert'],1)).toBe(1+1);
            });
        })

        describe('complexe role', () => {
        it('should return 4 when 1 vert ', () => {
            expect(getScoreEquipe(['vert','jaune','orange','rose'],1)).toBe(1+0+2+3);
        });
    })
        
    })
    
});

describe('trouverPartitionEgale', () => {
    it('trouve une répartition équilibrée pour un ensemble simple de dés', () => {
      
      const partition = trouverPartitionEgale(['rouge', 'bleu', 'violet', 'gris', 'vert', 'jaune']);
      expect(getScoreEquipe(partition[0])).toBe(getScoreEquipe(partition[1]));
    });

    it('gère correctement les dés avec multiples bleus', () => {
      
      const partition = trouverPartitionEgale(['bleu', 'bleu', 'vert', 'gris']);
      expect(getScoreEquipe(partition[0])).toBe(getScoreEquipe(partition[1]));
    });

    it('répartit correctement les dés sans interactions spéciales', () => {
      
      const partition = trouverPartitionEgale(['vert', 'jaune', 'gris', 'gris']);
      expect(getScoreEquipe(partition[0])).toBe(getScoreEquipe(partition[1]));
    });

    it('renvoie une erreur si aucune partition équilibrée n’est possible', () => {
        // Assurez-vous que ce cas est bien sans solution possible
      expect(() => trouverPartitionEgale(['vert', 'violet'])).toThrowError();
    });
  });





