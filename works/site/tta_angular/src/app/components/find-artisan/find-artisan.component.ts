import { Component } from '@angular/core';

@Component({
  selector: 'app-find-artisan',
  standalone: false,
  templateUrl: './find-artisan.component.html',
  styleUrl: './find-artisan.component.scss'
})
export class FindArtisanComponent {
  // Liste des étapes avec explications détaillées
  steps = [
    {
      number: 1,
      title: "Choisir une catégorie d'artisanat dans le menu",
      text: "Vous pouvez choisir une catégorie d’artisanat dans le menu pour afficher les artisans associés. Alternativement, utilisez la barre de recherche pour trouver des artisans par leur nom, leur spécialité ou leur localisation. Vous pouvez aussi combiner une catégorie avec une recherche par mot-clé pour affiner les résultats.",
      details: "Vous pouvez accéder aux catégories principales comme Bâtiment, Services, ou Alimentation. Chaque catégorie regroupe des artisans spécialisés. La recherche par mot-clé est idéale pour trouver rapidement un artisan spécifique ou explorer une spécialité particulière, même sans sélectionner une catégorie. En combinant les deux, vous obtenez des résultats plus pertinents et adaptés à vos besoins.",
    },
    {
      number: 2,
      title: "Choisir un artisan",
      text: "Parcourrez la liste d’artisans présentée et choisissez celui qui vous intéresse. D'un simple clic, vous pourrez consultez la fiche de contact de chaque artisan pour obtenir des informations détaillées : une description rapide de ses compétences, son site web (si disponible), et une adresse de contact.",
      details: "Chaque fiche comporte également un formulaire de contact permettant d’envoyer un email directement à l’artisan. Cela vous simplifie la mise en relation tout en fournissant les informations nécessaires pour évaluer l’artisan avant de le contacter.",
    },
    {
      number: 3,
      title: "Contacter l’artisan via le formulaire de contact",
      text: "Utilisez le formulaire de contact pour envoyer votre demande directement à l’artisan choisi.",
      details: "Remplissez le formulaire avec vos informations et détails concernant votre besoin. L’artisan recevra immédiatement votre demande. Tout en restant synthétique, indiquez la nature de votre besoin, votre disponibilité pour une intervention ou un rendez-vous, ainsi que la localisation précise. Cette approche garantit une bonne compréhension de vos attentes dès le premier contact.",
    },
    {
      number: 4,
      title: "Une réponse sera apportée sous 48 heures",
      text: "Recevez une réponse sous 48 heures pour finaliser les échanges avec l’artisan.",
      details: "L’artisan s’engage à répondre rapidement pour discuter des modalités et convenir d’un rendez-vous si nécessaire. N'oubliez pas de vérifier votr dossier de spams : parfois, même les messages les plus attendus peuvent s'y perdre par mégarde !",
    },
  ];
}
