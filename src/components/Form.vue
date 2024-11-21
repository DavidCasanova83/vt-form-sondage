<template>
  <v-container>
    <v-card class="pa-4">
      <!-- Titre de la question -->
      <h2>{{ questions[currentQuestion].title }}</h2>

      <!-- Boutons des options -->
      <v-btn
        v-for="(option, index) in questions[currentQuestion].options"
        :key="index"
        class="ma-2"
        @click="handleAnswer(option)"
      >
        {{ option }}
      </v-btn>
    </v-card>

    <!-- Boutons de navigation -->
    <div class="mt-4">
      <v-btn
        v-if="currentQuestion > 0"
        color="secondary"
        class="ma-2"
        @click="goBack"
      >
        Précédent
      </v-btn>

      <v-btn
        v-if="answers.length === questions.length"
        color="primary"
        class="ma-2"
        @click="submitAnswers"
      >
        Envoyer
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0, // Index de la question actuelle
      answers: [], // Réponses collectées
      questions: [
        {
          title: "Quel est votre pays de résidence ?",
          options: ["France", "Angleterre", "Allemagne"],
        },
        {
          title: "Êtes-vous en famille, seul, ou en couple ?",
          options: ["Famille", "Seul", "Couple"],
        },
      ],
    };
  },
  methods: {
    // Gérer la réponse de l'utilisateur
    handleAnswer(option) {
      this.answers[this.currentQuestion] = option; // Met à jour ou ajoute la réponse
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    // Revenir à la question précédente
    goBack() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    // Soumettre les réponses
    submitAnswers() {
      console.log("Réponses collectées :", this.answers);
      fetch("/api/submit.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.answers),
      })
        .then((res) => {
          if (res.ok) {
            alert("Réponses envoyées avec succès !");
          } else {
            alert("Une erreur est survenue.");
          }
        })
        .catch((err) => console.error("Erreur :", err));
    },
  },
};
</script>
