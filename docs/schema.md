# Schéma relationnel

**Musique** (**IdMusique**, NomMusique, DureeMusique, PrixMusique);

**Album** (**IdAlbum**, NomAlbum, DateSortieAlbum, _#IdMusique_);

**Artiste** (**IdArtiste**, NomArtiste, _#IdAlbum_);

**StyleMusique** (NomStyle);

**Playlist** (**IdPlaylist**, NomPlaylist);

**Utilisateur** (IdUtilisateur, PrenomUtilisateur, NomUtilisateur, EmailUtilisateur, DateInscriptionUtilisateur, _#IdPlaylist_);

**AComme** (_**#IdMusique**_, _**#NomStyle**_);

**Contient** (_**#IdMusique**_, _**#IdPlaylist**_);

**Achète** (_**#IdUtilisateur**_, _**#IdMusique**_, DateAchat);
