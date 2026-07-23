'use client';

import Card from 'react-bootstrap/Card';

type Contact = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
};

type ContactCardProps = {
  contact: Contact;
};

const ContactCard = ({ contact }: ContactCardProps) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Card.Img
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        style={{ width: '75px' }}
      />
    </Card.Header>

    <Card.Body>
      <Card.Title>
        {contact.firstName} {contact.lastName}
      </Card.Title>

      <Card.Subtitle className="mb-2 text-muted">
        {contact.address}
      </Card.Subtitle>

      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
