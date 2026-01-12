const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs from Facebook page
const imageUrls = [
  'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/480694436_1096406285620694_4731608979139658314_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=BjPid0D1qQcQ7kNvwEU1ppR&_nc_oc=AdkxT18HVSh5Nfa9pbMp4I783H2l9b95GURf6QVWcJEEpxFEqA-3UdFKwk8Qlny2bOA&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=Ks7z9k8xBofR8IMea5RyAQ&oh=00_AfpM-SnaQzBjC9s-BtTqC1cWBmqX6WUsb6svd11Dos_6Hw&oe=696A706D',
  'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/613040593_1340647114529942_1910939271045852086_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=50ad20&_nc_ohc=qMlEBS5IjDAQ7kNvwEvh2Sn&_nc_oc=AdnlOm7guXSeuxh5tjoLOmNnI9XJL8MLveIZKoYEa5KmAshN8nalvBdDtDmtSMar6lE&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_Afqu2hGkPvKNPN6bVVKhHeeOv_3YVENN1N7exfdcvtYzTA&oe=696A79EF',
  'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/611660669_1340647064529947_6686000221906311049_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_ohc=oOQDzWLoTNYQ7kNvwFtfNOy&_nc_oc=AdkjJ1OKg4rGR_s1js8bXdR6MxWsfZQueZwaJn-NTBhhmxjKyl_rn9LDteozDfFRIJE&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_AfrWWTJqYNEmR_aARQdMKC250d5JjVu8RVbX0GvQDwRuAA&oe=696A5B42',
  'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/614972257_1340647027863284_2280116533737340676_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=WAiz0Qv8emIQ7kNvwE0kHqY&_nc_oc=Adnm_TtORfRHcWcRKjHKxjzYUtiJyKvNI1vu3Q3nAqi2Im1BP5iF1aP-fJBExx6EuqI&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_Afqp2Z0KCuGB0K1odwOyhf-0Tp6hdeTEud1ul8UPPDXbSw&oe=696A59A1',
  'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/614961005_1340646981196622_4082179000514955116_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=ozsjScqeRn0Q7kNvwH09KSE&_nc_oc=AdkvHVGN06hZ4YClVXEhSE1VDR355-I10ag2ANUKx2nNpFO9orLV5Ce5bEr278EHwJM&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_Afr-99XY9sk2MBSN54NZ0z0vA4XP0kDhN50cw-QwopqkMQ&oe=696A7777',
  'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/612505024_1340646877863299_3049649705001682134_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=iMGE0N0u7OQQ7kNvwHzee8I&_nc_oc=AdkHrIdKmxxxw9xY-B5czuffdV1goBSCJs5I8ExE98_H-i8-jLhXJNYBdGK7r3rYQaU&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_AfrCWmClEZflPIOGib2Sf12SIaLtjGdZU7PY0CSUpVizYA&oe=696A8203',
  'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/612350106_1340646764529977_4618964864008242269_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=r8uwrE0YLasQ7kNvwFEseih&_nc_oc=Adl5Zl76oskJW85c-oGP46I5-OYTnncVuHqMJnqqAohTRtaZXj3f2_C98ooVZ-7DRpY&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_AfoE-Z84V1q8PrsEa38GA-GEttGWoAiYxuTnQGPix3Ywsg&oe=696A8964',
  'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/612213284_1340646527863334_1255608616519984863_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=50ad20&_nc_ohc=OjiAW6qb0ToQ7kNvwE5xtIL&_nc_oc=AdkGHxg4tJ-ZBcn5hRlJCCpnxR_-y9pr56sqUxTxpjLQRPz4n3OuIN9EcNJalsqcRCo&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_AfoIUp2MO0BnrXFGlZlMlwxcBdvMnqrtQwDrujShsrt2FA&oe=696A839C',
  'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/614734326_1340646337863353_286153904517051797_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_ohc=tg_hUWDKPuoQ7kNvwF2Ef8m&_nc_oc=AdmXwgJXCKIoNqjMuuRGJ5jNxcHnQu-qGEAuA_mm9u6QttAzTirYcPG7wt0oa4VwaKM&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=fj2FpNXKTCb13kIA1Fx3lw&oh=00_Afr_zXjOR8135lGrwIo50KHZk2oCVHvyT7mLZFnQG5rq_w&oe=696A86F3',
  'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/613496624_1340646287863358_4561480756212592607_n.jpg?stp=c448.0.1152.1152a_cp6_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=dKPHCjGtPW4Q7kNvwFmyaEG&_nc_oc=AdlYb_oORa1kPN02zb8QGGJ-G49TeQQE3oFPiYde-O3ntlTL2d8zi_xitj5I8RKea7w&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=NMvtEo_cCcaGpyfyqMkKiA&oh=00_AfrBh6tC2Sm0esAsqRFsaDMJcWwGFuMOzJ120XHXTh9urQ&oe=696A5BE6',
];

const imagesDir = path.join(__dirname, '..', 'public', 'images', 'team');

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(imagesDir, filename));
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(path.join(imagesDir, filename));
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(path.join(imagesDir, filename))) {
        fs.unlinkSync(path.join(imagesDir, filename));
      }
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Starting image downloads...');
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = `team-${i + 1}.jpg`;
    
    try {
      await downloadImage(url, filename);
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('Download complete!');
}

downloadAll();
