type De = 'vert' | 'gris' | 'orange' | 'jaune' | 'bleu' | 'rose';

export function getScoreEquipe(equipe: De[], nbEquipeAdverse: number): number {
    let score = 0;
    const count = {
        vert: equipe.filter(de => de === 'vert').length,
        gris: equipe.filter(de => de === 'gris').length,
        orange: equipe.filter(de => de === 'orange').length,
        jaune: equipe.filter(de => de === 'jaune').length,
        bleu: equipe.filter(de => de === 'bleu').length,
        rose: equipe.filter(de => de === 'rose').length
    };

    // Calcul des points de base pour chaque dé
    score += count.vert * 1;    // +1 pour chaque dé vert
    score += count.gris * 2;    // +2 pour chaque dé gris
    score += count.orange * (count.orange % 2 === 1 ? 1 : 2); // +1 si impair, sinon +2
    score -= count.jaune * 1;   // -1 pour chaque dé jaune
    score += count.bleu * nbEquipeAdverse;  // + nombre de dés dans l'équipe adverse pour chaque dé bleu

    // Traitement des dés rose
    if (count.rose > 0) {
        score += count.rose * 3; // +3 pour chaque dé rose
        // Tous les dés de valeur la plus faible passent à 0
        const minVal = Math.min(...Object.values(count).filter(x => x > 0));
        for (const key in count) {
            if (count[key] === minVal) {
                score -= count[key] * (key === 'orange' ? (count[key] % 2 === 1 ? 1 : 2) : 1);
                break;
            }
        }
    }

    return score;
}


export function trouverPartitionEgale(dés: De[], nbEquipeAdverse: number): [De[], De[]] {
    const n = dés.length;
    const totalSubsets = 1 << n;  // 2^n different subsets

    for (let i = 0; i < totalSubsets; i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(dés[j]);
            }
        }

        const complement = dés.filter((_, index) => !(i & (1 << index)));
        if (getScoreEquipe(subset, nbEquipeAdverse) === getScoreEquipe(complement, nbEquipeAdverse)) {
            return [subset, complement];
        }
    }

    throw new Error("Aucune partition équilibrée trouvée. Vérifiez les entrées.");
}
