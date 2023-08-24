const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'não possui bio cadastrado 😥'}</p>
                                            <p>👥<strong>Followers</strong>: ${user.followers || "no followers"}</p>
                                            <p>👥<strong>Following</strong>: ${user.following || "no following"}</p>
                                        </div>
                                      </div>`
        let repositoriesItems = ""
        user.repositories.forEach(repo => {
            repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">
                                      <h2>${repo.name}</h2>
                                      <div class="infos-repository">
                                        <p>⭐${repo.stargazers_count || "no stars"}</p>
                                        <p>🍴${repo.forks_count || "no forks"}</p>
                                        <p>👀${repo.watchers_count || "no watchers"}</p>
                                        <p>👩‍💻${repo.language ?? "Language not informed!"}</p>
                                      </div>
                                      </a>
                                  </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItems}</ul>
                                           </div>`
        }

        let eventList = ""
        user.events.forEach(event => {
            let commitMessage = ''
            if (event.payload.commits === undefined) {
                commitMessage = 'Event with no commits'
            } else {
                commitMessage = event.payload.commits[0].message
            }

            eventList += `<li><strong>${event.repo.name}</strong> - ${commitMessage}</li>`
        })

        if (user.events.length > 0) {
            if (user.events.type === "CreateEvent" || "PushEvent") {
                this.userProfile.innerHTML += `<div class="events section">
                                                    <h2>Events</h2>
                                                    <ul>${eventList}</ul>
                                               </div>`
            }
        } else if (user.events.length === 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Events</h2>
                                                <p>No recent events</p>
                                           </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
