import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Diogo2',
          email: 'diogomm2000@gmail.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
          isInstitution: true,
          institution: {
              name: 'FCT',
              logo: '../images/micrologo1.jpg',
              description: 'Escrever descrição sobre a empresa'
          },
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
          isInstitution: true,
        },
      ],
    internships:[
        {
            name:'Support Engineer Intern',
            url: 'https://www.google.com/',
            image: '../images/micrologo1.jpg',
            category: 'category',
            skills: 'skills',
            company: 'Microsoft',
            location: 'Lisbon',
            candidates: '23',
            status: 'Open',
            type: 'Part-time',
            date:'3 days ago',
            description: 'Bla Bla Bla Bla',
        },
        {
            name:'Data Analyst Intern',
            url: 'https://www.google.com/',
            image: '../images/amazon.png',
            category: 'category',
            skills: 'skills',
            company: 'Amazon',
            location: 'Porto',
            candidates: '123',
            status: 'Open',
            type: 'Part-time',
            date:'9 days ago',
            description: 'Bla Bla Bla Bla',
        },
        {
            name:'Bussiness Analyst Intern',
            url: 'https://www.google.com/',
            image: '../images/cisco.jpeg',
            category: 'category',            
            skills: 'skills',
            company: 'Cisco',
            location: 'Aveiro',
            candidates: '83',
            status: 'Open',
            type: 'Part-time',
            date:'2 weeks ago',
            description: 'Bla Bla Bla Bla Bla Bla Bla',
        },
        {
            name:'Strategic Sales Intern',
            url: 'https://www.google.com/',
            image: '../images/google.png',
            category: 'category',
            skills: 'skills',
            company: 'Google',
            location: 'Faro',
            candidates: '13',
            status: 'Closed',
            type: 'Part-time',
            date:'2 months ago',
            description: 'Bla Bla Bla Bla Bla',
        },
        {
            name:'Project Manager Intern',
            url: 'https://www.google.com/',
            image: '../images/sonae.png',
            category: 'category',
            skills: 'skills',
            company: 'Sonae',
            location: 'Lisbon',
            candidates: '43',
            status: 'Open',
            type: 'Part-time',
            date:'1 week ago',
            description: 'Bla Bla Bla Bla Bla',
        },
        {
            name:'RH Intern',
            url: 'https://www.google.com/',
            image: '../images/NOS.png',
            category: 'category',
            skills: 'skills',
            company: 'NOS',
            location: 'Lisboa',
            candidates: '27',
            status: 'Closed',
            type: 'Part-time',
            date:'2 weeks ago',
            description: 'Bla Bla Bla ',
        },
    ]
}

export default data;