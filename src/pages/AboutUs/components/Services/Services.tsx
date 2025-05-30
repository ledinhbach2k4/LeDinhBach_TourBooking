import { ServiceCard } from '../ServiceCard/ServiceCard';
import './Services.scss';

export const Services = () => {
  const services = [
    {
      icon: '🏝️',
      title: 'Екзотичні пляжні відпочинки',
      description: 'Відкрийте для себе райські куточки з білосніжними пляжами та кришталево чистою водою.'
    },
    {
      icon: '🏔️',
      title: 'Екстремальні пригоди',
      description: 'Для тих, хто шукає адреналін та незабутні враження в найвражаючих місцях світу.'
    },
    {
      icon: '🏛️',
      title: 'Культурні та історичні тури',
      description: 'Подорожуйте крізь епохи, відвідуючи найвидатніші пам\'ятки світової культури та історії.'
    },
    {
      icon: '🌍',
      title: 'Індивідуальні маршрути',
      description: 'Створіть свою унікальну подорож з нашими досвідченими експертами.'
    },
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Що ми пропонуємо?</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

