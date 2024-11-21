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
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentQuestion: 0,
      answers: [],
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
    handleAnswer(option) {
      this.answers[this.currentQuestion] = option;
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    goBack() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    submitAnswers() {
      const data = {
        answers: this.answers,
        city: this.city, // Ajoute la ville aux données
      };

      console.log("Données envoyées :", data);

      fetch("/api/submit.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
